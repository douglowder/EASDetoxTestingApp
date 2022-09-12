#!/usr/bin/env bash

PLATFORM=$1
DISABLE_ONBOARDING=$2

ESCAPED_URL="http%3A%2F%2Flocalhost%3A8081%2Findex.bundle%3Fplatform%3D$PLATFORM%26dev%3Dtrue%26minify%3Dfalse"
if [ $DISABLE_ONBOARDING -eq 1 ]; then
  ESCAPED_URL="$ESCAPED_URL%26disableOnboarding%3D1"
fi

LINK="easdetoxtestingapp://expo-development-client/?url=$ESCAPED_URL"

echo " ☛  ...Invoking the $PLATFORM app with disableOnboarding=$DISABLE_ONBOARDING"
if [ $PLATFORM = "android" ]; then
    echo $(adb shell am start -W -a android.intent.action.VIEW -d "$LINK" com.easdetoxtestingapp)
elif [ $PLATFORM = "ios" ]; then
    $(xcrun simctl openurl booted $LINK)
fi
