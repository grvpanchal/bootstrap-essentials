
def make_file(slug, title, parent = '', layout = 'fulldocs')
    


    f= File.new( parent + "/" + slug + ".html",'w')
    f << "---
layout: #{layout}
title: #{title}
slug: #{slug}
category: css
---

{% include fulldocs/#{parent}/#{slug}.html %}"
     f.close

end

require 'yaml'
thing = YAML.load_file('../_data/fulldocs.yml')
# puts thing.inspect


@arr1 = thing['css']

@arr1.each do |a|
    
    if a['menu']
        puts "-folder--------#{a['slug'].inspect}---" 
        Dir.mkdir('css/' + a['slug']) unless File.exists?('css/' + a['slug'])
        a['menu'].each do |aa|
            
            puts "------------file-------#{ aa['slug'].inspect}---"
            make_file(aa['slug'], aa['title'], 'css/' + a['slug'])            
        end       
    else
        puts "------------else--file-------#{ a['slug'].inspect}---" 
        make_file(a['slug'], a['title'], 'css')
        
    end
end

