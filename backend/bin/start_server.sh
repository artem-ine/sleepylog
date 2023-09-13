echo "running $0"

cd $(dirname $0)
cd ..
echo "running in $(pwd)"

# Precompile assets for the Rails backend
bundle install
# bundle exec rake assets:precompile

# # Run database migrations
# bundle exec rails db:create
# bundle exec rails db:migrate

# # Seed the database (if needed)
# bundle exec rails db:seed


# Start the Rails server
bundle exec rails server -p $RAILS_PORT
