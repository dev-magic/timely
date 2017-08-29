# frozen_string_literal: true

RSpec.describe '#test' do
  context 'To check that TravisCI is working...' do
    it '...passes this test' do
      expect(10 * 10).to eq 100
    end
  end
end
