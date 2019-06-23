server '3.113.88.38', user: 'ec2-user', roles: %w{app db web}
set :ssh_options, {
keys: [File.expand_path('~/.ssh/riknkn11.pem)')]
}
