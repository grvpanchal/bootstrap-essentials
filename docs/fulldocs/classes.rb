require 'csv'

csv = File.read('../../_data/classes.csv') 
ccsv = CSV.parse(csv, headers: true)
ccsv.each do |row| 
    puts"-------------#{row.to_h}-------------"
    
end