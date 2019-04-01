on firefoxRunning()
	tell application "System Events" to (name of processes) contains "Firefox"
end firefoxRunning

on run argv

	if (firefoxRunning() = false) then
		do shell script "open -a Firefox " & (item 1 of argv)
	else
		tell application "Firefox" to activate

		tell application "System Events"
			keystroke "t" using {command down}
			keystroke item 1 of argv & return
		end tell
	end if
end run