class Offer < ApplicationRecord
  include CommonScope
  belongs_to :product
  belongs_to :creator
  validates :product_id, presence: true
  validates :creator_id, presence: true
end
