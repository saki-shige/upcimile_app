class Api::V1::ProductsController < ApplicationController
  before_action :authenticate_company, only: [:create, :update, :destroy]

  def index
    products = Product.all
    render json: products
  end

  def show
    product = Product.find(params[:id])
    related_products = Product.where(category_id: product.category_id).where.not(id: product.id)
    company = product.company
    render json: {product: product, related_products: related_products, company: company }
  end

  def create
    product = Product.new(product_params)

    if product.save
      render json: {message:"#{product.name}を保存しました", data:product}
    else
      render json: {message:'保存できませんでした'}
    end
  end

  def update
    product = Product.find(params[:id])
    if product.update(product_params)
      render json: {data: product, message: "#{product.name}を更新しました"}
    else
      render json: {status:400, message: "#{product.name}の更新に失敗しました"}
    end
  end

  def destroy
    product = Product.find(params[:id])
    product.destroy
    render json: {status:201, message:"#{product.name}を削除しました"}
  end

  private

  def product_params
    params.require(:product).permit(:name, :introduction, :available_from, :available_to, :can_be_provided, :company_id, :category_id, :image)
  end
end
