class Api::V1::OffersController < ApplicationController
  before_action :authenticate_company, only: :accept
  before_action :authenticate_creator, only: [:create]

  def index
    if params[:part] === 'creator'
      id = current_api_v1_creator.id
      offers = Offer.where(creator_id: id)
      render status: 200, json: offers, include: [product: { include: :company }]
    elsif params[:part] === 'company'
      id = current_api_v1_company.id
      offers = Offer.joins(:product).where(product: { company_id: id })
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
    if offer.update(is_accepted: params[:type] === 'accept')
      render status: 200, json: offer
    else
      render status: 500, json: { message: 'offerを承諾できませんでした' }
    end
  end

  private

  def offer_params
    params.require(:offer).permit(:product_id)
  end
end
