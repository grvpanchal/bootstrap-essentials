require 'csv'

csv = File.read('../_data/classes.csv') 
ccsv = CSV.parse(csv, headers: true)
ccsv.each do |row| 
    print "File Name: #{ row["class-name"].gsub(" ","-").gsub(".","") } \n"
    print "Title: #{ row["title"] } \n"
    print "Class Name: #{ row["class-name"] } \n"
    print "Description: #{ row["description"] } \n"
    print "Top Category: #{ row["top-category"] } \n"
    print "Category: #{ row["category"] } \n"
    print "Origin: #{ row["origin"] } \n"
    print "Use Cases: #{ row["use-cases"] } \n"
    print "Chained Classes: #{ row["chained-class"] } \n"
    print "Parent Classes: #{ row["parent-class"] } \n"
    print "Element: #{ row["element"] } \n"
    
    exit
    
end


def make_file(slug, title, category, parent = '', indx =false, layout = 'class')
    
    indx ? filename = 'index' : filename = slug 

    f= File.new( parent + "/" + filename + ".html",'w')
    f << "---
layout: #{layout}
title: #{title}
slug: #{slug}
category: #{category}
---

{% include fulldocs/#{parent}/#{filename}.html %}"
     f.close
end