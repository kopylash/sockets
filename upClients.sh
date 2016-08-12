#!/usr/bin/env bash
## declare an array variable
declare -a arr=("607fd019-2949-49b3-ab61-c470085a092c"
#"97f01dcb-3e3e-4fb2-b3d6-291381f624e9"
#"69646906-7e9d-477c-859b-4f6a603c0016"
#"9c5de899-de31-4dce-93ec-1dda3a62466f"
#"02c94da4-f234-4cf6-8187-bf496a1097b5"
"84c5775a-5eff-4a73-aff2-de991414c2ea")

## now loop through the above array
for i in "${arr[@]}"
do
   start node client "$i"
   # or do whatever with individual element of the array
done
