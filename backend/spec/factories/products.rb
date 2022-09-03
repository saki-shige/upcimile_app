FactoryBot.define do
  factory :product do
    association :company
    association :category
    name { 'test product' }
    introduction { 'testproduct introduction' }
    available_from { Date.today }
    # available_to
    can_be_provided { true }
    # image
  end
end
