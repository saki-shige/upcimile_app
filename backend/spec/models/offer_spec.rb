require 'rails_helper'

RSpec.describe 'Offer', type: :model do
  describe 'バリデーション' do
    let(:creator) { create(:creator) }
    let(:product) { create(:product) }

    context 'product_id,creator_idが入力されている場合' do
      let(:offer) { build(:offer, creator:, product:) }

      it 'バリデーションを通過する' do
        expect(offer.valid?).to eq true
      end
    end

    context 'product_id,category_idのいずれかが入力されていない場合' do
      let(:offer_without_category) { build(:offer, product:) }
      let(:offer_without_product) { build(:offer, product:) }

      it 'バリデーションを通過できない' do
        expect(offer_without_category.valid?).to eq false
        expect(offer_without_product.valid?).to eq false
      end
    end
  end
end
