require 'csv'


def make_file(row, layout = 'class')
    filename =  row["class-name"].gsub(" ","-").gsub(".","")
    f= File.new( "classes/" + filename + ".html",'w')
    f << "---
title: #{ row["title"] }
layout: #{layout}
class: #{ row["class-name"] }
slug: #{filename}
category: classes
top-category: #{ row["top-category"] }
category-slug: #{ row["category"] }
description: '#{ row["description"] }'
chained-class: '#{ row["chained-class"] }'
parent-class: '#{ row["parent-class"] }'
element: '#{ row["element"] }'
tags:
    - #{ row["origin"] }
    - #{ row["top-category"] }
---"
     f.close
end

def generate_files()
    csv = File.read('../_data/classes.csv') 
    ccsv = CSV.parse(csv, headers: true)
    ccsv.each do |row| 
        print "File Name: #{ row["class-name"].gsub(" ","-").gsub(".","") } \n"
        
        make_file(row)

    end 
end

generate_files()