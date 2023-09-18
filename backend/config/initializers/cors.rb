Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'

    resource '*', 
            headers: %w[Authorization],
            methods: %i[get post put patch delete options head],
            expose: %w[Authorization]

  end
end
