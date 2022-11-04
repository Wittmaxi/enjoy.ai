const { withAndroidManifest } = require('@expo/config-plugins')

module.exports = function androiManifestPlugin(config) {
  return withAndroidManifest(config, async (configProps) => {
    const androidManifest = configProps.modResults.manifest

    androidManifest.$ = {
      ...androidManifest.$,
      'xmlns:tools': 'http://schemas.android.com/tools',
    }

    const activityPerm1 = { $: { 'android:name': 'android.permission.ACTIVITY_RECOGNITION' } }
    const activityPerm2 = { $: { 'android:name': 'com.google.android.gms.permission.ACTIVITY_RECOGNITION' } }

    androidManifest['uses-permission'].push(activityPerm1)
    androidManifest['uses-permission'].push(activityPerm2)

    return configProps
  })
}
