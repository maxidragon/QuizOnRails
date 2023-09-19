class QuestionPolicy < ApplicationPolicy
    def update?
        user == record.quiz.user
    end
    def destroy?
      user == record.quiz.user
    end
  end