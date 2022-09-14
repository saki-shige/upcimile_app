class Api::V1::ProductsController < ApplicationController
  before_action :authenticate_company, only: %i[create update destroy]

  def index
    products = if params[:category]
                 Product.available.recent.where(category_id: params[:category]).limit(params[:limit])
               else
                 Product.available.recent.limit(params[:limit])
               end
    render json: products
  end

  def show
    product = Product.find(params[:id])
    related_products = Product.where(category_id: product.category_id).where.not(id: product.id).recent
    company = product.company
    render json: { product:, related_products:, company: }
  end

  def create
    product = Product.new(product_params)
    product.company_id = current_api_v1_company.id
    if product.save
      render status: 200, json: { message: "#{product.name}を保存しました", data: product }
    else
      render status: 400, json: { message: product.errors.full_messages }
    end
  end

  def update
    product = Product.find(params[:id])
    if product.update(product_params)
      render json: { data: product, message: "#{product.name}を更新しました" }
    else
      render status: 400, json: { message: product.errors.full_messages }
    end
  end

  def destroy
    product = Product.find(params[:id])
    product.destroy
    render json: { status: 201, message: "#{product.name}を削除しました" }
  end

  private

  def product_params
    params.require(:product).permit(:name, :introduction, :available_from, :available_to, :can_be_provided,
                                    :company_id, :category_id, :image)
  end
end
