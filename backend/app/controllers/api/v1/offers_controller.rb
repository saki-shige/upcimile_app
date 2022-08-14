class Api::V1::OffersController < ApplicationController
  def index
    if params[:creator_id]
      offers = Offer.where(creator_id: params[:creator_id])
      render status: 200, json: offers, include: [:product]
    elsif params[:company_id]
      offers = Offer.joins(:product).where(product: {company_id: params[:company_id]})
      render status: 200, json: offers, include: [:product, :creator]
    else
      render status: 400, json: {message: 'company_idもしくはcreator_idを指定してください'}
    end
  end

  def create
    offer = Offer.new(offer_params)
    if offer.save
      render status: 201, json: offer
    else
      render status: 500, json: {message: 'offerを作成できませんでした'}
    end
  end

  def accept
    offer = Offer.find(params[:id])
    if offer.update(is_accepted: true)
      render status: 200, json: offer
    else
      render status: 500, json: {message: 'offerを承諾できませんでした'}
    end
  end

  private

  def offer_params
    params.require(:offer).permit(:product_id, :creator_id)
  end
end
