class WorksController < ApplicationController
  before_action :set_work, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, except: [:index]
  # GET /works
  # GET /works.json
  def index
    if (current_user)
      @works = current_user.works
    end
   
  end

  # GET /works/1
  # GET /works/1.json
  def show
     @work = Work.find(params[:id])
     render :json => {:name => @work.name, :desc => @work.description}
  end

  # GET /works/new
  def new
    @work = current_user.works.build
  end

  # GET /works/1/edit
  def edit
  end

  # POST /works
  # POST /works.json
  def create
    if request.xhr?
      @work = current_user.works.build(work_params)
      #@work = Work.new(work_params)
      if @work.save
        puts @work.status
        render :json => {:id => @work.id}
      else
        render :json => {:id => 0}
      end
    else
     render :json => {:id => 0}
    end
  end

  # PATCH/PUT /works/1
  # PATCH/PUT /works/1.json
  def update
    @work = Work.find(params[:id])
    if params.has_key?(:desc)
      puts "desc";
      @work.description = params[:desc]
    elsif params.has_key?(:status)
      @work.status = params[:status]
      puts @work.status
    #  num = current_user.works.where(:all, :conditions => ["status = ?", params[:status]])
     # puts num
      # count the number of completed tasks 
    else
      render :json => {:id => 0}
    end

    if @work.save
      puts @work.status
      render :json => {:id => @work.id}
    else
      render :json => {:id => 0}
    end 

  end

  # DELETE /works/1
  # DELETE /works/1.json
  def destroy
    if request.xhr?
      @work.destroy
      render :json => {:success => true}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_work
      @work = Work.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def work_params
      params.require(:work).permit(:name, :description)
    end
end
