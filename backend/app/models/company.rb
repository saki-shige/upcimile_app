# frozen_string_literal: true

class Company < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
  include CommonScope
  has_many :products, dependent: :destroy
  has_many :offers, through: :products
  mount_uploader :image, ImageUploader
  validates :name, presence: true, length: { maximum: 30 }
  validates :introduction, length: { maximum: 300 }
  validates :address, length: { maximum: 300 }
  validates :corporate_site, length: { maximum: 300 }, format: /\A#{URI::DEFAULT_PARSER.make_regexp(%w[http https])}\z/,
                             allow_blank: true
  validates :number_of_employees, allow_nil: true, numericality: { greater_than_or_equal_to: 0, less_than: 100_000_000 }
  validates :capital, allow_nil: true, numericality: { greater_than_or_equal_to: 0, less_than: 10_000_000_000_000 }

  def self.guest
    Company.find_or_create_by!(email: 'guest@example.com') do |company|
      company.name = 'ゲスト'
      company.password = SecureRandom.urlsafe_base64
    end
  end
end
