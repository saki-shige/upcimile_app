class Product < ApplicationRecord
  belongs_to :company
  belongs_to :category
  has_many :product_tags
  has_many :tags, through: :product_tags
  has_many :offers
  mount_uploader :image, ImageUploader
end
