from django.shortcuts import render

def index(request):
    return render(request,'tetris/index.html',{})