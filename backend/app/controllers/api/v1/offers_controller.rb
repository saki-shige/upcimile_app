class Api::V1::OffersController < ApplicationController
  before_action :authenticate_company, only: :accept
  before_action :authenticate_creator, only: [:create]

  def index
    case params[:part]
    when 'creator'
      return render status: 401, json: { message: 'ログインしてください' } unless current_api_v1_creator

      offers = Offer.where(creator_id: current_api_v1_creator.id).recent
      render status: 200, json: offers, include: [product: { include: :company }]
    when 'company'
      return render status: 401, json: { message: 'ログインしてください' } unless current_api_v1_company

      offers = Offer.joins(:product).where(product: { company_id: current_api_v1_company.id }).recent
      render status: 200, json: offers, include: %i[product creator]
    else
      render status: 400, json: { message: 'company_idもしくはcreator_idを指定してください' }
    end
  end

  def create
    offer = Offer.new(offer_params)
    offer.creator_id = current_api_v1_creator.id
    if offer.save
      render status: 201, json: offer
    else
      render status: 500, json: { message: 'offerを作成できませんでした' }
    end
  end

  def accept
    offer = Offer.find(params[:id])
    return render status: 401, json: { message: 'ログインしてください' } unless offer_to_me?(offer)
    return render status: 400, json: { message: 'typeに誤りがあります' } unless type_correct?

    if offer.update(is_accepted: params[:type] == 'accept')
      render status: 200, json: offer
    else
      render status: 500, json: { message: 'offerを承諾できませんでした' }
    end
  end

  private

  def offer_params
    params.require(:offer).permit(:product_id)
  end

  def offer_to_me?(offer)
    offer.product.company_id == current_api_v1_company.id
  end

  def type_correct?
    params[:type] == 'accept' || params[:type] == 'decline'
  end
end
