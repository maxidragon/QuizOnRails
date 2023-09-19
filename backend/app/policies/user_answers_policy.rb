class UserAnswersPolicy < ApplicationPolicy
    def show?
        user == record.user
        
end