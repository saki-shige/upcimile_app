class Api::V1::CompaniesController < ApplicationController
  before_action :authenticate_company, only: :update

  def index
    companies = Company.all
    render json: companies
  end

  def show
    company = Company.find(params[:id])
    render json: company, include: [:products]
  end

  def update
    company = Company.find(params[:id])
    if (current_api_v1_company.id == company.id) && company.update(company_params)
      render json: { company:, message: 'プロフィール情報を更新しました' }
    else
      render json: { message: 'プロフィールの更新に失敗しました' }
    end
  end

  def company_params
    params.require(:company).permit(:name, :introduction, :address, :number_of_employees, :capital,
                                    :date_of_establishment, :corporate_site, :image)
  end
end
