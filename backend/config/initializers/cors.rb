Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "https://sleepylog-992f57ae98df.herokuapp.com/"

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
