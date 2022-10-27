module SearchModel
  extend ActiveSupport::Concern

  module SearchableModels
    extend self
    @included_in ||= []

    def add(klass)
      @included_in << klass
    end

    def included_in
      @included_in
    end

    def index_names
      @included_in.map(&:index_name)
    end
  end

  included do
    SearchableModels.add self

    def self.index_name
      self.name.underscore.pluralize
    end

    def index_features
      serializable_hash
    end

    def index_action
      {
        index: {
          _index: self.class.index_name,
          # TODO: just let opensearch handle id creation
          _id: id,
          data: index_features
        }
      }
    end
  end
end
