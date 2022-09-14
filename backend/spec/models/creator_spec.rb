require 'rails_helper'
require 'securerandom'

RSpec.describe 'Creator', type: :model do
  describe 'バリデーション' do
    subject { creator.valid? }

    context 'name,channel_idが入力されている場合' do
      let(:creator) { build(:creator) }

      it 'バリデーションを通過する' do
        is_expected.to eq true
      end
    end

    context 'name,channel_idのいずれかが入力されていない場合' do
      let(:creator_without_name) { build(:creator, name: '') }
      let(:creator_without_channel_id) { build(:creator, channel_id: '') }

      it 'バリデーションを通過しない' do
        expect(creator_without_name.valid?).to eq false
        expect(creator_without_channel_id.valid?).to eq false
      end
    end

    context 'nameが30字以上の場合' do
      let(:too_long_name) { SecureRandom.alphanumeric(31) }
      let(:creator) { build(:creator, name: too_long_name) }

      it 'バリデーションを通過できない' do
        is_expected.to eq false
      end
    end

    context 'introductionが300字以上の場合' do
      let(:too_long_introduction) { SecureRandom.alphanumeric(301) }
      let(:creator) { build(:creator, introduction: too_long_introduction) }

      it 'バリデーションを通過できない' do
        is_expected.to eq false
      end
    end
  end
end
