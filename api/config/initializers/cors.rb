Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      # Dockerでfront:8080ポートにforntのURLを設定しているため。
      origins 'http://front:8080'
  
      resource '*',
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :head]
    end
  end