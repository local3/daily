class User < ApplicationRecord
  attr_accessor :remember_token

  # リレーション関係開始--------------------------------------------

  belongs_to :language
  has_many :memos
  has_many :diaries
  has_many :dictionaries

  # リレーション関係終了--------------------------------------------
  
  # モデル操作時の処理等開始--------------------------------------------
  
  before_save { email.downcase! }
  # before_save { self.email = email.downcase }

  # モデル操作時の処理等終了--------------------------------------------

  # バリデーション開始--------------------------------------------
  # emailカラムのバリデーションチェック用正規表現
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                      format: { with: VALID_EMAIL_REGEX },
                      uniqueness: { case_sensitive: false }

  validates :password, presence: true, length: { minimum: 1 }, allow_nil: true
  # バリデーション終了--------------------------------------------

  # その他設定開始--------------------------------------------

  has_secure_password

  # その他設定終了--------------------------------------------

  # クラスメソッド定義開始--------------------------------------------
  def User.digest(string)
      # digestをBCryptで作成する時のコストを登録
      # 最小コストでできるように設定している
      cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
      # 送られてきたパスワード文字列(string)と上記で作成したコスト(cost)を引数に与えて、実際にBCryptでpassword_digestを作成する
      BCrypt::Password.create(string, cost: cost)
  end

  # ランダムなトークンを返す
  def User.new_token
    SecureRandom.urlsafe_base64
  end

  # 永続セッションのためにユーザーをデータベースに記憶する
  def remember
    self.remember_token = User.new_token
    update_attribute(:remember_digest, User.digest(remember_token))
  end

  # 渡されたトークンがダイジェストと一致したらtrueを返す
  def authenticated?(remember_token)
    return false if remember_digest.nil?
    BCrypt::Password.new(remember_digest).is_password?(remember_token)
  end

  # ユーザーのログイン情報を破棄する
  def forget
    update_attribute(:remember_digest, nil)
  end

  # 渡された文字列のハッシュ値を返す
  def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  # ランダムなトークンを返す
  def User.new_token
    SecureRandom.urlsafe_base64
  end

  # クラスメソッド定義終了--------------------------------------------
end
