Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      # Dockerでfront:8080ポートにforntのURLを設定しているため。
      origins 'http://front:8080', 'http://front:3000', 'http://localhost:3000', 'https://localhost:8080/', 'http://web:3000', 'localhost:3000'
  
      resource '*',
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :head]
    end
  end