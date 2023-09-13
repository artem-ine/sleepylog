require "faker"

30.times do
  title = Faker::Lorem.sentence
  content = Faker::Lorem.paragraphs.join("\n\n")

  Article.create(title: title, content: content)
end
