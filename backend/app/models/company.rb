# frozen_string_literal: true

class Company < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
  has_many :products, dependent: :destroy
  has_many :offers, through: :products
  mount_uploader :image, ImageUploader
  validates :name, presence: true, length: { maximum: 30 }
  validates :introduction, length: { maximum: 300 }
  validates :address, length: { maximum: 30 }, format: /\A#{URI::regexp(%w(http https))}\z/
  validates :number_of_employees, length: { maximum: 10 }
  validates :capital, length: { maximum: 30 }
end
