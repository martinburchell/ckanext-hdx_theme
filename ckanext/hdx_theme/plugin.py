import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit



class HDXThemePlugin(plugins.SingletonPlugin):
	plugins.implements(plugins.IConfigurer)
	plugins.implements(plugins.IRoutes, inherit=True)

	def update_config(self, config):
		toolkit.add_template_directory(config, 'templates')
		toolkit.add_public_directory(config, 'public')

	def before_map(self, map):
		map.connect('home', '/', controller='ckanext.hdx_theme.splash_page:SplashPageController', action='index')
		return map