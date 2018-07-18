from shutil import copyfile
from distutils.dir_util import copy_tree
import os
import subprocess

if not os.path.exists("kiestze_yarn/dist/static/css/"):
    os.makedirs("kiestze_yarn/dist/static/css/")

path = os.path.abspath("./kiestze_yarn/")
print(path)
#p = subprocess.Popen(["yarn", "development-windows"], cwd=path)
#p.wait()

copyfile("kiestze_yarn/src/static/css/style.css", "kiestze_yarn/dist/static/css/style.css")
copyfile("kiestze_yarn/src/static/css/bootstrap.min.css", "kiestze_yarn/dist/static/css/bootstrap.min.css")


copy_tree("kiestze_yarn/dist/static/", "kiestze_django/static/")

copyfile("kiestze_yarn/dist/detail.html", "kiestze_django/templates/detail.html")
copyfile("kiestze_yarn/dist/index.html", "kiestze_django/templates/index.html")
copyfile("kiestze_yarn/dist/lijst.html", "kiestze_django/templates/lijst.html")
