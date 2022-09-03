require 'rails_helper'
require 'securerandom'

RSpec.describe 'Company', type: :model do
  describe 'バリデーション' do
    subject { company.valid? }

    context 'name,email,password(password_confirmation)が入力されている場合' do
      let(:company) { build(:company) }

      it 'バリデーションを通過する' do
        is_expected.to eq true
      end
    end

    context 'name,email,password(password_confirmation)のうちいずれかが入力されていない場合' do
      let(:company_without_name) { build(:company, name: '') }
      let(:company_without_email) { build(:company, email: '') }
      let(:company_without_password) { build(:company, password: '', password_confirmation: '') }

      it 'バリデーションを通過しない' do
        expect(company_without_name.valid?).to eq false
        expect(company_without_email.valid?).to eq false
        expect(company_without_password.valid?).to eq false
      end
    end

    context 'nameが30字以上の場合' do
      let(:too_long_name) { SecureRandom.alphanumeric(31) }
      let(:company) { build(:company, name: too_long_name) }

      it 'バリデーションを通過できない' do
        is_expected.to eq false
      end
    end

    context 'introductionが300字以上の場合' do
      let(:too_long_introduction) { SecureRandom.alphanumeric(301) }
      let(:company) { build(:company, introduction: too_long_introduction) }

      it 'バリデーションを通過できない' do
        is_expected.to eq false
      end
    end

    context 'addressが300字以上の場合' do
      let(:too_long_address) { SecureRandom.alphanumeric(301) }
      let(:company) { build(:company, address: too_long_address) }

      it 'バリデーションを通過できない' do
        is_expected.to eq false
      end
    end

    context 'corporate_siteが30字以上の場合' do
      let(:too_long_corporate_site) { SecureRandom.alphanumeric(31) }
      let(:company) { build(:company, corporate_site: too_long_corporate_site) }

      it 'バリデーションを通過できない' do
        is_expected.to eq false
      end
    end

    context 'corporate_siteがURLの構造でない場合' do
      let(:irregular_url) { 'foolish_url' }
      let(:company) { build(:company, corporate_site: irregular_url) }

      it 'バリデーションを通過できない' do
        is_expected.to eq false
      end
    end

    context 'number_of_employeesが範囲外の場合' do
      # 想定されている範囲　0 <= number_of_employees < 100,000,000
      let(:irregular_number) { -1 }
      let(:company) { build(:company, number_of_employees: irregular_number) }

      it 'バリデーションを通過できない' do
        is_expected.to eq false
      end
    end

    context 'capitalが負のが範囲外の場合' do
      # 想定されている範囲　0 <= number_of_employees < 10,000,000,000,000
      let(:irregular_number) { -1 }
      let(:company) { build(:company, capital: irregular_number) }

      it 'バリデーションを通過できない' do
        is_expected.to eq false
      end
    end
  end
end
