class Product < ApplicationRecord
  belongs_to :company
  belongs_to :category
  has_many :product_tags
  has_many :tags, through: :product_tags
  has_many :offers, dependent: :destroy
  mount_uploader :image, ImageUploader
  validates :name, presence: true, length: { maximum: 30 }
  validates :introduction, length: { maximum: 300 }
  validates :available_from, presence: true
  validates :company_id, presence: true
  validates :category_id, presence: true
  validate :validate_available_from_not_before_today
  validate :validate_available_to_not_before_available_to

  private

  def validate_available_from_not_before_today
    errors.add(:available_from, 'は今日以降の日付を設定してください') if available_from && available_from < Date.today
  end

  def validate_available_to_not_before_available_to
    errors.add(:available_to, 'はavailable_to以降の日付を設定してください') if available_from && available_to && available_from > self.available_to
  end
end
