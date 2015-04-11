class WorksController < ApplicationController
  before_action :set_work, only: [:show, :edit, :update, :destroy]

  # GET /works
  # GET /works.json
  def index
    @works = Work.all
  end

  # GET /works/1
  # GET /works/1.json
  def show
     @work = Work.find(params[:id])
     render :json => {:name => @work.name, :desc => @work.description}
  end

  # GET /works/new
  def new
    @work = Work.new
  end

  # GET /works/1/edit
  def edit
  end

  # POST /works
  # POST /works.json
  def create
    if request.xhr?
      @work = Work.new(work_params)
      if @work.save
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
    respond_to do |format|
      if @work.update(work_params)
        format.html { redirect_to @work, notice: 'Work was successfully updated.' }
      else
        format.html { render action: 'edit' }
      end
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
