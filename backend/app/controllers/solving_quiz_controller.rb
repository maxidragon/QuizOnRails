class SolvingQuizController < ApplicationController
    before_action :authenticate_user!

    def start_quiz 
        quiz = Quiz.find(params[:quiz_id])
        quiz_attempt = quiz.quiz_attempts.build(quiz_attempt_params)
        if quiz_attempt.save
            render json: quiz_attempt
        else
            render json: {error: quiz_attempt.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def get_info_with_questions
        #quiz with questions and answers but without info about correct answers
        quiz = Quiz.find(params[:quiz_id])
        render json: quiz, include: [:questions, :answers.except(:is_correct)]
    end

    def submit_answer
        quiz_attempt = QuizAttempt.find(params[:quiz_attempt_id])
        answer = Answer.find(params[:answer_id])
        user_answer_params = {quiz_attempt_id: quiz_attempt.id, answer_id: answer.id}
        user_answer = quiz_attempt.user_answers.build(user_answer_params)
        if user_answer.save
            render json: user_answer
        else
            render json: {error: user_answer.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def finish_quiz
        quiz_attempt = QuizAttempt.find(params[:quiz_attempt_id])
        quiz_attempt_params = {finished: true}
        quiz_attempt.update(quiz_attempt_params)
        render json: quiz_attempt
    end

end
