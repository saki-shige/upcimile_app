class Api::V1::CompaniesController < ApplicationController
  before_action :authenticate_company, only: :update

  def index
    companies = Company.recent.limit(params[:limit])
    render json: companies
  end

  def show
    company = Company.formatted_company_with_products(params[:id], params[:mypage])
    render json: company
  end

  def update
    company = Company.find(params[:id])
    if (current_api_v1_company.id == company.id) && company.update(company_params)
      render status: 200, json: { company:, message: 'プロフィール情報を更新しました' }
    else
      render status: 400, json: { message: company.errors.full_messages }
    end
  end

  def company_params
    params.require(:company).permit(:name, :introduction, :address, :number_of_employees, :capital,
                                    :date_of_establishment, :corporate_site, :image)
  end
end
