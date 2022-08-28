class Offer < ApplicationRecord
  belongs_to :product
  belongs_to :creator
  validates :product_id, presence: true
  validates :creator_id, presence: true
end
