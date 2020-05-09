/**
 * @param {number[]} predators
 * @return {number}
 */
const maximumGroups = predators => {
    let groups = [...predators]

    for(let i = 0; i < predators.length; i++) {
        for(let j = 0; j < predators.length; j++) {
            if(predators[i] === predators[j]) { // direct predator was found
                let group = groups[i]
                while(groups[group] !== group) { // find indirect predators
                    group = groups[group]
                }
                let group2 = groups[j]
                while(groups[group2] !== group2) { // find indirect predators
                    group2 = groups[group2]
                }
                groups[group] = groups[group2]
            }
        }
    }

    return groups.filter((group, idx) => idx === group).length
}