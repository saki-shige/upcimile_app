require 'rails_helper'
require 'securerandom'

RSpec.describe 'Product', type: :model do
  describe 'バリデーション' do
    let!(:company) { create(:company) }
    let!(:category) { create(:category) }

    subject { product.valid? }

    context 'name, available_from, company_id, category_idが入力されている場合' do
      let(:product) { build(:product, company:, category:) }

      it 'バリデーションを通過する' do
        is_expected.to eq true
      end
    end

    context 'name, available_from, company_id, category_idのいずれかが入力されていない場合' do
      let(:product_without_name) { build(:product, name: '', company:, category:) }
      let(:product_without_company) { build(:product, category:) }
      let(:product_without_category) { build(:product, company:) }
      let(:product_without_available_from) { build(:product, category:, company:, available_from: '') }

      it 'バリデーションを通過しない' do
        expect(product_without_name.valid?).to eq false
        expect(product_without_company.valid?).to eq false
        expect(product_without_category.valid?).to eq false
        expect(product_without_available_from.valid?).to eq false
      end
    end

    context 'nameが30字以上の場合' do
      let(:too_long_name) { SecureRandom.alphanumeric(31) }
      let(:product) { build(:product, company:, category:, name: too_long_name) }

      it 'バリデーションを通過できない' do
        is_expected.to eq false
      end
    end

    context 'introductionが300字以上の場合' do
      let(:too_long_introduction) { SecureRandom.alphanumeric(301) }
      let(:product) { build(:product, company:, category:, introduction: too_long_introduction) }

      it 'バリデーションを通過できない' do
        is_expected.to eq false
      end
    end

    context 'available_fromが昨日以前の日付だった場合' do
      let(:day_before_today) { Date.yesterday }
      let(:product) { build(:product, company:, category:, available_from: day_before_today) }

      it 'バリデーションを通過できない' do
        is_expected.to eq false
      end
    end

    context 'available_toがavailable_from以前の日付だった場合' do
      let(:available_from) { Date.tomorrow }
      let(:day_before_available_from) { Date.tomorrow - 1 }
      let(:product) { build(:product, company:, category:, available_from:, available_to: day_before_available_from) }

      it 'バリデーションを通過できない' do
        is_expected.to eq false
      end
    end
  end

  describe 'scope(available)' do
    let(:day_before_today) { Date.yesterday }
    let!(:products) { create_list(:product, 3) }
    let!(:products_not_available) do
      create_list(:product, 2, :skip_validate, available_from: day_before_today, available_to: day_before_today)
    end

    it '利用可能な商品を抽出する' do
      expect(Product.available.length).to eq(products.length)
    end
  end
end
