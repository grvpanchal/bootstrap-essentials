require 'yaml'

def make_file(slug, title, category, parent = '', indx =false, layout = 'fulldocs')
    
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

def generate_files(category)
    thing = YAML.load_file('../_data/fulldocs.yml')
    @arr1 = thing[category]

    @arr1.each do |a|
        
        if a['menu']
            puts "-folder--------#{a['slug'].inspect}---" 
            Dir.mkdir(category + '/' + a['slug']) unless File.exists?(category + '/' + a['slug'])
            make_file(a['slug'], a['title'], category, category + '/' + a['slug'], true)
            a['menu'].each do |aa|
                
                puts "------------file-------#{ aa['slug'].inspect}---"
                make_file(aa['slug'], aa['title'], category, category + '/' + a['slug'])            
            end       
        else
            puts "------------else--file-------#{ a['slug'].inspect}---" 
            make_file(a['slug'], a['title'], category, category)
            
        end
    end
end


generate_files('css')
generate_files('components')
