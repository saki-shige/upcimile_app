FactoryBot.define do
  factory :offer do
    is_accepted { false }
    association :product
    association :creator
  end
end
