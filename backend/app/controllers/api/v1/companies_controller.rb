class Api::V1::CompaniesController < ApplicationController
  def index
    companies = Company.all
    render json:companies
  end

  def show
    company = Company.find(params[:id])
    render json: company, include: [:products]
  end

  def update
    company = Company.find(params[:id])
    if company.update(company_params)
      render json: {company:company, message:"プロフィール情報を更新しました"}
    else
      render json: {message: "プロフィールの更新に失敗しました"}
    end
  end

  def company_params
    params.require(:company).permit(:name, :introduction, :address, :number_of_employees, :capital, :date_of_establishment, :corporate_site, :image)
  end

end
