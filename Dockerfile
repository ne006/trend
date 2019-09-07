FROM ruby:2.6-alpine

RUN apk add --no-cache build-base && \
		apk add openssl openssl-dev && \
		apk add ca-certificates && \
		apk add --update tzdata && \
		apk add yarn nodejs

COPY certs/rootCA.crt /usr/local/share/ca-certificates/ca.crt
RUN update-ca-certificates

RUN gem install bundler -v "2.0.2"

ENV RAILS_ENV production

WORKDIR /

COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
RUN bundle install

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install

COPY . .

RUN bundle exec rake assets:precompile

CMD ["rails", "s"]
