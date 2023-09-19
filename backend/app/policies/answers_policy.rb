class QuestionPolicy < ApplicationPolicy
    def update?
        user == record.question.quiz.user
    end
    def destroy?
      user == record.question.quiz.user
    end
  end