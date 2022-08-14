FactoryBot.define do
  factory :creator do
    name { 'test creator' }
    sequence(:email) { |n| "testcreator#{n}@example.com" }
    channel_id { 'sample channel id'}
  end
end
