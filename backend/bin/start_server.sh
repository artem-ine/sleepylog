echo "running $0"
cd $(dirname $0)
cd ..
echo "running in $(pwd)"
echo "$(ip addr show)"

# Precompile assets for the Rails backend
bundle install
# bundle exec rake assets:precompile

# # Run database migrations
bundle exec rails db:migrate
bundle exec rails db:seed

# # Seed the database (if needed)
# bundle exec rails db:seed


# Start the Rails server
rails_port="${1:-3000}"
bundle exec rails server -p $rails_port