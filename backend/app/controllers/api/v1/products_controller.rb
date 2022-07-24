class Api::V1::ProductsController < ApplicationController
  def index
    products = Product.all
    render json: products
  end

  def create
    product = Product.create(product_params)
    if product.save
      render json: {status:201}
    else
      render json: {status:400, message:'保存できませんでした'}
    end
  end

  def update
    product = Product.find(params[:id])
    if product.update(product_params)
      render json: {status:201, message: "#{product.name}を更新しました"}
    else
      render json: {status:400, message: "#{product.name}の更新に失敗しました"}
    end
  end

  def product_params
    params.permit(:name, :introduction, :available_from, :available_to, :can_be_provided, :company_id, :category_id)
  end
end
