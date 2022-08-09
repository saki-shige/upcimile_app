FactoryBot.define do
  factory :company do
    name { 'test company' }
    introduction { 'test company introduction'}
    sequence(:email) { |n| "tester#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
  end
end
